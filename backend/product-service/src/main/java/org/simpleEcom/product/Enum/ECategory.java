package org.simpleEcom.product.Enum;

public enum ECategory {
    STARTERS("Starters"),
    PASTAS("Pastas"),
    PIZZAS("Pizzas"),
    BURGERS("Burgers"),
    DESERTS("Deserts"),
    SALADS("Salads"),
    GRILLED_MEATS("Grilled Meats"),
    SEAFOODS("Seafoods"),
    CHICKEN("Chicken"),
    VEGETARIAN("Vegetarian"),
    COLD_DRINKS("Cold Drinks"),
    HOT_DRINKS("Hot Drinks");
    
    private final String category;

    ECategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return this.category;
    }
}
