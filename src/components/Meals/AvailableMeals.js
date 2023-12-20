import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { error, isLoading, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformingMeals = (mealObj) => {
      const loadedMeals = [];
      for (const mealKey in mealObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealObj[mealKey].name,
          description: mealObj[mealKey].description,
          price: mealObj[mealKey].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: "https://react-food-order-87a4b-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      transformingMeals
    );
  }, [fetchMeals]);

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  if (isLoading) {
    return (
      <section>
        <p className={classes["mealsIsLoading"]}>Loading ...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className={classes.mealsError}>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
