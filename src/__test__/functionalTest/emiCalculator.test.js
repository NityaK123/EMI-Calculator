import { calculateEmi } from '../../utils/calculateEmi'


describe("",()=>{ 

    const mockData = {
        totalCost:710000,
        downPaymentRate:0,
        interestRate:8.8,
        tenure:60
    }
     
    test("Test case 1",()=>{
        const emiReceived = calculateEmi(mockData)
        expect(emiReceived.emi).toBe(14670)
    })
})