const Joi = require('@hapi/joi');


exports.getBoards = async (ctx) => {
    // const { value } = ctx.params;
    // let account = null;

    // try {
    //     account = await (key === 'email' ? Account.findByEmail(value) : Account.findByUserId(value));
    // } catch(e) {
    //     ctx.throw(500, e);
    // }

    // ctx.body = {
    //     exists: account != null
    // };
    // const schema = Joi.object({
    //     email: Joi.string().email().required(),
    //     password: Joi.string().required()
    // });

    // const result = schema.validate(ctx.request.body);

    // if(result.error) {
    //     ctx.status = 400;
    //     return;
    // }

    // const { email, password } = ctx.request.body;
    
    // let account = null;
    // try {
    //     account = await Account.findByEmail(email);
    // } catch (e) {
    //     ctx.throw(500, e);
    // }

    // if(!account || !account.validatePassword(password)) {
    //     ctx.status = 403;
    //     return;
    // }

    // let token = null;
    // try {
    //     token = await account.generateToken();
    // } catch (e) {
    //     ctx.throw(500, e);
    // }

    // ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    // ctx.body = account.profile;
};