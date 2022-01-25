"use strict";
exports.id = 8277;
exports.ids = [8277];
exports.modules = {

/***/ 8277:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
exports.Y = getApiHandler;
var _url = __webpack_require__(8835);
var _apiUtils = __webpack_require__(3140);
var _utils = __webpack_require__(2056);
var _utils1 = __webpack_require__(7620);
function getApiHandler(ctx) {
    const { pageModule , encodedPreviewProps , pageIsDynamic  } = ctx;
    const { handleRewrites , handleBasePath , dynamicRouteMatcher , normalizeDynamicRouteParams ,  } = (0, _utils).getUtils(ctx);
    return async (req, res)=>{
        try {
            // We need to trust the dynamic route params from the proxy
            // to ensure we are using the correct values
            const trustQuery = req.headers[_utils.vercelHeader];
            const parsedUrl = handleRewrites(req, (0, _url).parse(req.url, true));
            if (parsedUrl.query.nextInternalLocale) {
                delete parsedUrl.query.nextInternalLocale;
            }
            handleBasePath(req, parsedUrl);
            let params = {
            };
            if (pageIsDynamic) {
                const result = normalizeDynamicRouteParams(trustQuery ? parsedUrl.query : dynamicRouteMatcher(parsedUrl.pathname));
                params = result.params;
            }
            await (0, _apiUtils).apiResolver(req, res, Object.assign({
            }, parsedUrl.query, params), await pageModule, encodedPreviewProps, true);
        } catch (err) {
            console.error(err);
            if (err instanceof _utils1.DecodeError) {
                res.statusCode = 400;
                res.end('Bad Request');
            } else {
                // Throw the error to crash the serverless function
                throw err;
            }
        }
    };
}

//# sourceMappingURL=api-handler.js.map

/***/ })

};
;