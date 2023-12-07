module.exports = theFunc =>(req, res, next) =>{

    Promise.resolve(theFunc(req, res, next)).catch(next);

    // ham ek tarah se try catch hi use kar rahe he yr try ho gya     or ye catch ho gaya   orjo andar ka function he try wale block me wo isko mil hi rha he upar  se to dekha kis tarah se chize ghumake ke karte he isme
};