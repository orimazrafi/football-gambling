import React from "react";
import { H4 } from "../../elements/H4";
import { Image } from "../../elements/Image";
// import { ListItem } from "../../elements/ListItem";
// import { ListContainer } from "../../elements/ListContainer";
import { useHistory } from "react-router-dom";
import "./ScoreTable.css";
const gamblers: any = [
  {
    name: "ori",
    picture:
      "https://lh3.googleusercontent.com/a-/AOh14GgZR27i-iWH2BnD2lldl4heLXPyjETIs0HIXKeF9g",
    score: 3,
  },
  {
    name: "razi",
    picture:
      "https://lh3.googleusercontent.com/a-/AOh14GgZR27i-iWH2BnD2lldl4heLXPyjETIs0HIXKeF9g",
    score: 5,
  },
  {
    name: "tom",
    picture:
      "https://lh3.googleusercontent.com/a-/AOh14GgZR27i-iWH2BnD2lldl4heLXPyjETIs0HIXKeF9g",
    score: 6,
  },
  {
    name: "tal",
    picture:
      "https://lh3.googleusercontent.com/a-/AOh14GgZR27i-iWH2BnD2lldl4heLXPyjETIs0HIXKeF9g",
    score: 2,
  },
  {
    name: "elad",
    picture:
      "https://lh3.googleusercontent.com/a-/AOh14GgZR27i-iWH2BnD2lldl4heLXPyjETIs0HIXKeF9g",
    score: 31,
  },
  {
    name: "yuval",
    picture:
      "https://lh3.googleusercontent.com/a-/AOh14GgZR27i-iWH2BnD2lldl4heLXPyjETIs0HIXKeF9g",
    score: 33,
  },
  {
    name: "eilan",
    picture:
      "https://lh3.googleusercontent.com/a-/AOh14GgZR27i-iWH2BnD2lldl4heLXPyjETIs0HIXKeF9g",
    score: 43,
  },
];
export const ScoreTable = () => {
  const history = useHistory();

  const handleClick = (name: string) => {
    history.push("/opponents", { name });
  };
  const handleClass = (index: number) => {
    let className = "item";
    if (index === 0) className += " first__index";
    if (index === gamblers.length - 1) className += " last__index";
    return className;
  };
  return (
    <>
      <H4>ScoreTable</H4>
      {/* <ListContainer>
        {gamblers.sort((a: any, b: any) => b.score - a.score) &&
          gamblers.map((gambler: any, index: any) => (
            <ListItem
              key={gambler.name}
              onClick={() => handleClick(gambler.name)}
            >
              <div style={{ marginRight: "10px" }}>{index + 1}.</div>
              <Image maringRight src={gambler.picture} />
              <div style={{ margin: "auto", fontWeight: "bold" }}>
                {gambler.name}
              </div>{" "}
              {"   "}
              <div style={{ marginLeft: "auto" }}> {gambler.score}</div>
            </ListItem>
          ))}
      </ListContainer> */}
      <div className="container">
        {gamblers.sort((a: any, b: any) => b.score - a.score) &&
          gamblers.map((gambler: any, index: any) => (
            <div
              className={handleClass(index)}
              key={gambler.name}
              onClick={() => handleClick(gambler.name)}
            >
              <div style={{ marginRight: "10px" }}>{index + 1}.</div>
              {/* <a href="#animals"> */}
              <Image maringRight src={gambler.picture} />
              {/* </a> */}
              <div style={{ margin: "auto", fontWeight: "bold" }}>
                {gambler.name}
              </div>{" "}
              <div style={{ marginLeft: "auto" }}> {gambler.score}</div>
            </div>
          ))}
        {/* 
       
        <a href="#architecture" className="item">
          <img
            src="https://placeimg.com/100/100/architecture"
            alt="Architecture"
          />
        </a>
        <a href="#nature" className="item">
          <img src="https://placeimg.com/100/100/nature" alt="Nature" />
        </a>
        <a href="#people" className="item">
          <img src="https://placeimg.com/100/100/people" alt="People" />
        </a>
        <a href="#tech" className="item">
          <img src="https://placeimg.com/100/100/tech" alt="Tech" />
        </a> */}
      </div>
    </>
  );
};
