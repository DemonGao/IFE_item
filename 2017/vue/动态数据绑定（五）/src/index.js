/**
 * Created by demongao on 2017/3/2.
 */
function Bue(options) {
    this._init(options);
}

Bue.prototype = {
    constructor: Bue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./api/lifecycle'),
    ...require('./api/data'),
    observer: {...require('./observer/observer')}
};

module.exports = Bue;