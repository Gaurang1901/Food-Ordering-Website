export function calculateSales(apiResponse) {
    const orders = Array.isArray(apiResponse) ? apiResponse : apiResponse.orders || [];

    let totalSales = 0;
    let totalPrice = 0;
    let growth = 0;
    let previousOrderAmount = null;

    orders.forEach(order => {
        if (order.orderStatus === "COMPLETED") {
            totalSales += 1;
            totalPrice += order.totalAmount || 0;

            if (previousOrderAmount !== null) {
                // Calculate growth as the percentage change between current and previous order amounts
                growth = ((order.totalAmount - previousOrderAmount) / previousOrderAmount) * 100;
            }

            // Update the previousOrderAmount to the current order's total amount
            previousOrderAmount = order.totalAmount;
        }
    });

    return {
        totalSales,
        totalPrice,
        growth: growth.toFixed(2) // Keep growth as a percentage with two decimal places
    };
}
