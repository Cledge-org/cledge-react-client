import { getResourcesInfo } from "./resources/get-resources";
import { getAllPathways } from "./get-all-pathways";

const resources_tag_list = [];
const pathway_tag_list = [];

export const config = {
  api: {
    externalResolver: true,
  },
};

export const putResourceTags = (): Promise<void> => {
  return new Promise(async (res, err) => {
    try {
      let fetchedResources = await getResourcesInfo();
      let articles = fetchedResources.articles;
      let videos = fetchedResources.videoList;
      let resources = fetchedResources.resources;
      for (let i = 0; i < articles.length; i++) {
          resources_tag_list.push(articles[i].tag);
      }
      for (let i = 0; i < videos.length; i++) {
          resources_tag_list.push(videos[i].tag);
      }
      for (let i = 0; i < resources.length; i++) {
          resources_tag_list.push(resources[i].tag);
      }
    } catch (e) {
      err(res);
    }
  });
};

export const getTagsFromList = (tag: string) : Promise<Array<string>> => {
  return new Promise(async (res, err) => {
    try {
      let selectedTags = [];
      for (let i = 0; i < resources_tag_list.length; i++) {
        if (resources_tag_list[i].includes(tag))
          selectedTags.push(resources_tag_list[i]);
      }
      selectedTags.sort((a: string, b: string) =>  levenshteinDistance(a, tag) - levenshteinDistance(b, tag));
      return selectedTags;
    } catch (e) {
      err(res);
    }
  });
};

// Implementation In Progress!

// // Pathways has 3 set of tags to look through
// //  1st Tag: Pathway Object itself   -- RIGHT NOW JUST CHECKS PATHWAY
// //  2nd tag: PathWayModule Object (which is stored in each Pathway)
// //  3rd tag: PersonalizedContent (inside each PathwayModule)
// // They all have tags we probably wanna look through
// export function getTaggedPathwayMultiple(tagName: string, deliminator: string) : Promise<void> {
//   return new Promise(async (res, err) => {
//     try {
//       const selectedTags = [];
//       const splitTags = tagName.split(deliminator);
//       for (let i = 0; i < splitTags.length; i++) {
//         for (let j = 0; j < pathway_tag_list.length; j++) {
//             const pathwayTag = pathway_tag_list[j].split(deliminator);
//             // for (let k = 0; k < pathwayTag.length; k++) {
//             //   if (pathwayTag)
//             // }
//         }
//       }
//     } catch (e) {
//       err(e);
//     }
//   });
// }

export function putPathWayTags(): Promise<void> {
  return new Promise(async (res, err) => {
    try {
      let fetchedAllPathway = await getAllPathways();
      for (let i = 0; i < fetchedAllPathway.length; i++) {
        let fetchedTag = fetchedAllPathway[i].tags;
        pathway_tag_list.push(fetchedTag);
      }
    } catch (e) {
      err(e);
    }
  });
}

export function getPathWayTags(tag: string): Promise<Array<string>> {
  return new Promise(async (res, err) => {
    try {
      let selectedTags = [];
      for (let i = 0; i < pathway_tag_list.length; i++) {
          if (pathway_tag_list[i].includes(tag))
            selectedTags.push(pathway_tag_list[i]);
      }
      selectedTags.sort((a: string, b: string) =>  levenshteinDistance(a, tag) - levenshteinDistance(b, tag));
      return selectedTags;
    } catch (e) {
      err(e);
    }
  });
}



const levenshteinDistance = (a: string, b: string) => { 
  if (a.length === 0) 
    return b.length;  
  if (b.length === 0)
    return a.length;
  var matrix = [];
  // increment along the first column of each row  
  var i;  
  for (i = 0; i <= b.length; i++) {    
    matrix[i] = [i];  
  }
  // increment each column in the first row  
  var j;  
  for (j = 0; j <= a.length; j++) {  
    matrix[0][j] = j;  
  }
  // Fill in the rest of the matrix  
  for (i = 1; i <= b.length; i++) {    
    for (j = 1; j <= a.length; j++) {      
      if (b.charAt(i - 1) === a.charAt(j - 1)) {       
        matrix[i][j] = matrix[i - 1][j - 1];     
      } else {       
                                // substitution           // insertion                   // deletion 
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));  
      }   
    }  
  }
  return matrix[b.length][a.length];
};