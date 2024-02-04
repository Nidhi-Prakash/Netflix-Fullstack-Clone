import React from "react";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();
  return (
    <select
      className="flex justify-center items-center ml-[5rem] text-[1.4rem] bg-[#00000066] text-[#ffffff] cursor-pointer"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres?.map((genre) => {
        return (
          <option value={genre.id} key={genre.id} className="border">
            {genre.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectGenre;
