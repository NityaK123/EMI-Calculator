import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { calculateEmi } from '../utils/calculateEmi'

const EmiPage = () => {

    const [formData, setFormData] = useState({
        totalCost: 0,
        interestRate: 0,
        processingFeeRate: 0,
        downPaymentRate: 0,
        loanAmountRate: 0,
        tenure:12
    }) 

    const [amount,setAmount] = useState({
        loanAmount:0,
        processingFee:0,
        totalPayAbleAmount:0,
        emi:0
    })

    const handleChange = (e) => {
        if(e.target){
            const { name, value } = e.target 
            setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }))
        }
     }

     useEffect(()=>{
        const {loanAmount,processingFee,totalPayAbleAmount,emi} = calculateEmi(formData) 
        if(isNaN(loanAmount) || isNaN(processingFee) || isNaN(totalPayAbleAmount) || isNaN(emi)){
            setAmount({loanAmount:0,processingFee:0,totalPayAbleAmount:0,emi:0})
        }
        else{
            setAmount(()=>({loanAmount:loanAmount,processingFee:processingFee,totalPayAbleAmount:totalPayAbleAmount,emi:emi}))
        }
     },[formData])

    return (
        <>
            <div className="container">
                <h1>Emi Calculator</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Total Cost Of Asset</Form.Label>
                        <Form.Control type="number" name="totalCost" value={formData.totalCost} onChange={(e) => handleChange(e)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Interest Rate (in %)</Form.Label>
                        <Form.Control type="number" name="interestRate" onChange={(e) => handleChange(e)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Processing Fee (in %)</Form.Label>
                        <Form.Control type="number" name="processingFeeRate" onChange={(e) => handleChange(e)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Total Down Payment - {amount.totalPayAbleAmount}</Form.Label>
                        <Form.Control type="range" name="downPaymentRate" min="0" max="100" step="5" onChange={(e) => handleChange(e)} />
                        <Form.Text>Total DownPayment Rate {formData.downPaymentRate}%</Form.Text> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Total Loan Amount - {amount.loanAmount}</Form.Label>
                        <Form.Control type="range" name="loanAmountRate" value={amount.emi}  min="0" max={amount.loanAmount} onChange={(e) => handleChange(e)}/>
                        <Form.Label>Emi Per Month :{amount.emi}</Form.Label>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tenure</Form.Label>
                            <ToggleButtonGroup type="radio" value={formData.tenure} name="tenure" onChange={(value) => handleChange({target:{name:"tenure", value}})} className="d-flex gap-2 mb-2">
                                <ToggleButton id="tbg-btn-1" value={12}>12</ToggleButton>
                                <ToggleButton id="tbg-btn-2" value={24}>24</ToggleButton>
                                <ToggleButton id="tbg-btn-3" value={36}>36</ToggleButton>
                                <ToggleButton id="tbg-btn-4" value={48}>48</ToggleButton>
                                <ToggleButton id="tbg-btn-5" value={60}>60</ToggleButton>
                            </ToggleButtonGroup>
                    </Form.Group>
                </Form> 
            </div>
        </>
    )
}

export default EmiPage