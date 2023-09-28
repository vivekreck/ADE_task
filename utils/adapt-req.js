module.exports.adaptReq = (req, res) => {
    return Object.freeze({
        path: req.path,
        method: req.method,
        body: req.body,
        queryParams: req.query,
        urlParams: req.params,
    })
};

