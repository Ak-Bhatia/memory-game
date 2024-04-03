import React from "react";
import images from "../../images";
import { SlDiamond } from "react-icons/sl";

import "./styles.css";

function Card({ allFlipped, flippedIdx, index, card, checkCard }) {
  return (
    <div
      key={index}
      className={`card ${
        allFlipped || flippedIdx.includes(index) || card.matched
          ? "flipped"
          : ""
      }`}
      onClick={() => checkCard(index)}
    >
      {allFlipped || flippedIdx.includes(index) || card.matched ? (
        <img
          src={images[`img${card.symbol}`]}
          height={"100%"}
          width={"100%"}
          alt={`${card.symbol}`}
        />
      ) : (
        <div>
          <SlDiamond color="#fff" size={48} />
        </div>
      )}
    </div>
  );
}

export default Card;
