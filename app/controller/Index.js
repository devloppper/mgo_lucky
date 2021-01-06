const BaseCtrl = require('./BaseCtrl');

class IndexCtrl extends BaseCtrl {

    /**
     * @api {get}   /   首页
     */
    async homePage() {
        return this.ctx.render('static/user/openHome')
    }
}

module.exports = IndexCtrl;