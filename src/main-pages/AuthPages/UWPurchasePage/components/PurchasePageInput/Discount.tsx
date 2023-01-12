import stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createDiscountCode = async (discountCode: string, percentOff: 100, duration: 'once' ) => {
    try {
        const coupon = await stripe.coupons.create({
            percent_off: percentOff,
            duration: duration,
        });
        return coupon;
    } catch (err) {
        throw new Error(`Error creating discount code: ${err}`);
    }
};

async function createDiscountAndAccessBlockedContent() {
    try {
        const myDiscountCode = await createDiscountCode("MYCODE", 20, 'forever');

        
        const discountCode = myDiscountCode.id;
        await storeDiscountCode(discountCode);
        
    } catch (err) {
        console.error("Error creating discount code: ", err);
    }
}

async function checkDiscountCodeAndAccessContent(code:string){
    try{
        const isValid = await checkDiscountCodeValidity(code); 
        if(isValid){
            
            console.log("Access granted!")
        }else{
            console.log("Invalid discount code!");
        }
    }catch(err){
        console.error("Error checking discount code: ", err);
    }
}