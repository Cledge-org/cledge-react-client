import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Range,
  Text,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { Toolbar } from "src/common/components/RichTextEditor/components/Toolbar/Toolbar";
import { Button } from "src/common/components/RichTextEditor/components/Button/Button";
import { Icon } from "src/common/components/RichTextEditor/components/Icon/Icon";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";
import { CustomEditor } from "src/@types/slate";
import { CompactPicker } from "react-color";
import classNames from "classnames";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const RichTextEditor = ({
  onChange,
  className,
  initialValue,
}: {
  onChange: Function;
  initialValue: Descendant[];
  className?: string;
}) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <div
      className={classNames("px-4", className)}
      style={{ width: "fit-content", border: "2px solid lightgray" }}
    >
      <Slate
        onChange={(text) => {
          onChange(text);
        }}
        editor={editor}
        value={initialValue}
      >
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <FontColorDropdown />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <BlockButton format="left" icon="format_align_left" />
          <BlockButton format="center" icon="format_align_center" />
          <BlockButton format="right" icon="format_align_right" />
          <BlockButton format="justify" icon="format_align_justify" />
          <FontSizeDropdown />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();

                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
const FontColorDropdown = () => {
  const editor = useSlate();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="position-relative">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{
          width: "20px",
          height: "20px",
          backgroundColor:
            (Editor.marks(editor) && Editor.marks(editor)["font-color"]) ??
            "black",
        }}
      />
      <div className="position-absolute" style={{ zIndex: 100 }}>
        {isOpen && (
          <CompactPicker
            colors={[
              "#070452",
              "#2651ED",
              "#4D4D4D",
              "#999999",
              "#FFFFFF",
              "#F44E3B",
              "#FE9200",
              "#FCDC00",
              "#DBDF00",
              "#A4DD00",
              "#68CCCA",
              "#73D8FF",
              "#AEA1FF",
              "#FDA1FF",
              "#333333",
              "#808080",
              "#cccccc",
              "#D33115",
              "#E27300",
              "#FCC400",
              "#B0BC00",
              "#68BC00",
              "#16A5A5",
              "#009CE0",
              "#7B64FF",
              "#FA28FF",
              "#000000",
              "#666666",
              "#B3B3B3",
              "#9F0500",
              "#C45100",
              "#FB9E00",
              "#808900",
              "#194D33",
              "#0C797D",
              "#0062B1",
              "#653294",
              "#AB149E",
            ]}
            onChange={({ hex }) => {
              Transforms.setNodes(
                editor,
                { "font-color": hex },
                { match: Text.isText, split: true }
              );
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
const FontSizeDropdown = () => {
  const editor = useSlate();
  const fontSizes = () => {
    let fontSizes = [];
    for (let i = 0; i <= 64; i++) {
      fontSizes.push(`${i + 8}px`);
    }
    return fontSizes;
  };
  return (
    <DropDownQuestion
      isForWaitlist
      containerStyles={{ margin: 0 }}
      buttonStyles={{
        width: "20%",
        fontSize: "12px",
      }}
      onChange={(fontSize) => {
        Transforms.setNodes(
          editor,
          { "font-size": fontSize },
          { match: Text.isText, split: true }
        );
        //toggleMark(editor, `font-size`, fontSize);
      }}
      defaultValue={
        (Editor.marks(editor) && Editor.marks(editor)["font-size"]) ?? "14px"
      }
      valuesList={fontSizes()}
    />
  );
};
const toggleMark = (editor: CustomEditor, format, customVal?: any) => {
  const isActive = isMarkActive(editor, format);
  //console.log(isActive);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    //console.log("adding mark");
    //console.log(Editor.string(editor, editor.selection));
    Editor.addMark(editor, format, customVal ?? true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks && marks[format];
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf["font-size"]) {
    children = <span style={{ fontSize: leaf["font-size"] }}>{children}</span>;
  }
  if (leaf["font-color"]) {
    children = <span style={{ color: leaf["font-color"] }}>{children}</span>;
  }
  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default RichTextEditor;
