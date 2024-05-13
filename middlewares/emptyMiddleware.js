const emptyMiddleware = (req, res, next) => {
const {length} = Object.keys(req.body);
if(length) {
return next({status: 404, message: 'we can`t create empty obj'})
}
next()
}
export default emptyMiddleware;