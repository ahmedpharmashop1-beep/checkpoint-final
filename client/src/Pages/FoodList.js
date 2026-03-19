import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "../JS/Actions/food";
import FoodCard from "../Components/FoodCard";

const FoodList = () => {
  const dispatch = useDispatch();

  const listFood = useSelector((state) => state.foodReducer.listFood);
  const load = useSelector((state) => state.foodReducer.load);
  const error = useSelector((state) => state.foodReducer.error);

  useEffect(() => {
    dispatch(getFood());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Food List Page</h1>

      {load && <h3>Loading...</h3>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      <div style={{ marginTop: "20px" }}>
        {listFood && listFood.length === 0 ? (
          <h3>No food available</h3>
        ) : (
          listFood?.map((food) => <FoodCard key={food._id} food={food} />)
        )}
      </div>
    </div>
  );
};

export default FoodList;