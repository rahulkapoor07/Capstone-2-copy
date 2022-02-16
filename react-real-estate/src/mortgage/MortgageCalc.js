import React, { useState , useRef} from 'react';
import "./MortgageCalc.css";

function MortgageCalc({setIsMortgageOpen, mortgageCalcFunc, setMortgageData}) {
    const selectRef = useRef();
    const INTIAL_VALUES = {"price" : "", "priceError" : "", "percent_tax_rate":"","percent_tax_rateError":"",
     "year_term":"", "year_termError":"", "down_payment":"","down_paymentError" :"", "percent_rate":"",
     "percent_rateError":"", "monthly_home_insurance" : "","monthly_home_insuranceError":""};
    const [formData, setFormData] = useState(INTIAL_VALUES);

    const handleError = ()=>{
        let priceError = "";
        let percent_tax_rateError = "";
        let year_termError = "";
        let down_paymentError = "";
        let percent_rateError = "";
        let monthly_home_insuranceError = "";

        if(formData.price === "") priceError = "Please enter value";
        if(formData.percent_tax_rate === "") percent_tax_rateError = "Please enter tax rate value";
        if(formData.year_term === "") year_termError = "Please select one";
        if(formData.down_payment === "") down_paymentError = "Please enter value";
        if(formData.percent_rate === "") percent_rateError = "Please enter value";
        if(formData.monthly_home_insurance === "") monthly_home_insuranceError = "Please enter value";

        if(priceError || percent_tax_rateError || year_termError || down_paymentError 
            || percent_rateError || monthly_home_insuranceError){
                setFormData(data => ({...data, priceError, percent_tax_rateError, year_termError,
                down_paymentError, percent_rateError, monthly_home_insuranceError}));
                return false;
            }
        return true;
    }
    
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]:value}));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (handleError()){
            setMortgageData(null);
            const data = {"price" : formData.price, "percent_tax_rate":formData.percent_tax_rate,
            "year_term":formData.year_term,"down_payment":formData.down_payment,"percent_rate":formData.percent_rate,
             "monthly_home_insurance" : formData.monthly_home_insurance}
             mortgageCalcFunc({...data})
            selectRef.current.value = "";
            setFormData(INTIAL_VALUES);
            setIsMortgageOpen(true);
        }
        
    }

    return (
        <div className='container MortgageCalc'>
            <h1>Mortgage Calculator</h1>
            <form onSubmit={handleSubmit}>
            <div className='row'>
            <div className="inputs input-group mb-3 col-md-6 d-flex justify-content-center"
                style={{"position":"relative"}}>
                <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                </div>
                <input type="text" placeholder='Home Price' aria-label="Amount (to the nearest dollar)"
                value={formData.price} name="price" onChange={handleChange} />
                <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                </div>
                <div className='error'>{formData.priceError}</div>
            </div>
            

            <div className="inputs input-group mb-3 col-md-6 d-flex justify-content-center">
                 <input type="text" placeholder='Percent Tax Rate' aria-label="Amount (to the nearest dollar)"
                 value={formData.percent_tax_rate} name="percent_tax_rate" onChange={handleChange}/>
                <div className="input-group-append">
                    <span className="input-group-text">%</span>
                </div>
                <div className='error'>{formData.percent_tax_rateError}</div>
            </div>
            

            <div className="inputs input-group mb-3 col-md-6 d-flex justify-content-center">
                {/* <input type="text" placeholder='Please enter Years' aria-label="Amount (to the nearest dollar)" /> */}
                <select ref={selectRef} onChange={handleChange} name="year_term" id="cars" style={{"width":"10rem"}}>
                    <option value="">Select One</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                <div className="input-group-append">
                    <span className="input-group-text">Years</span>
                </div>
                <div className='error'>{formData.year_termError}</div>
            </div>
           

            <div className="inputs input-group mb-3 col-md-6 d-flex justify-content-center">
                <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                </div>
                <input type="text" placeholder='Down Payment' aria-label="Amount (to the nearest dollar)"
                value={formData.down_payment} name="down_payment" onChange={handleChange} />
                <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                </div>
                <div className='error'>{formData.down_paymentError}</div>
            </div>
            

            <div className="inputs input-group mb-3 col-md-6 d-flex justify-content-center">
                <input type="text" placeholder='Percent Rate' aria-label="Amount (to the nearest dollar)"
                value={formData.percent_rate} name="percent_rate" onChange={handleChange}  />
                <div className="input-group-append">
                    <span className="input-group-text">%</span>
                </div>
                <div className='error'>{formData.percent_rateError}</div>
            </div>
            

            <div className="inputs input-group mb-3 col-md-6 d-flex justify-content-center">
                <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                </div>
                <input type="text" placeholder='Monthly Home Insurance' aria-label="Amount (to the nearest dollar)"
                value={formData.monthly_home_insurance} name="monthly_home_insurance" onChange={handleChange} />
                <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                </div>
            <div className='error'>{formData.monthly_home_insuranceError}</div>
            </div>


            </div>
            <button id="button" className='btn btn-primary btn-md mt-3 d-flex float-right' type='submit'>Calculate</button>
            </form>
        </div>
    )
}

export default MortgageCalc;
