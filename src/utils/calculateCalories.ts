const calculateCalories = (protein?: number, fat?: number, carbs?: number) => {
    return 4 * (protein ?? 0) + 9 * (fat ?? 0) + 4 * (carbs ?? 0);
}
export default calculateCalories