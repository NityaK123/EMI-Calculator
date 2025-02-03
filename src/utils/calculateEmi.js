export const calculateEmi = (data) => {
    let error;

    let loanAmount=0;
    let processingFee=0;
    let totalPayAbleAmount=0;
    let interestRateMonthly=0;
    let tenureMonths=0;

    if (
        isNaN(data.totalCost) || data.totalCost < 0 ||
        isNaN(data.downPaymentRate) || data.downPaymentRate < 0 ||
        isNaN(data.interestRate) || data.interestRate < 0 ||
        isNaN(data.tenure) || data.tenure < 0
    ) {
        error = "Data must fill"
    }
    // Calculate loan amount after down payment
    loanAmount = data.totalCost - (data.totalCost * data.downPaymentRate) / 100;

    // Calculate processing fee
    processingFee = (loanAmount * data.processingFeeRate) / 100;

    // Calculate total payable amount including processing fee and down payment
    totalPayAbleAmount = processingFee + (data.totalCost * data.downPaymentRate) / 100;

    // EMI calculation (using the correct formula)
    interestRateMonthly = data.interestRate / 100 / 12; // monthly interest rate (annual rate divided by 12 and converted to decimal)
    tenureMonths = data.tenure; // tenure in months (12, 24, 36, etc.)

    let emi = 0;
    if (interestRateMonthly !== 0) {
        // EMI formula when interest rate is non-zero
        emi = Math.round((loanAmount * interestRateMonthly * Math.pow(1 + interestRateMonthly, tenureMonths)) / (Math.pow(1 + interestRateMonthly, tenureMonths) - 1));
    } else {
        // EMI formula when interest rate is 0
        emi = Math.round(loanAmount / tenureMonths); 
    }
    return { loanAmount, processingFee, totalPayAbleAmount, emi,error };
}
