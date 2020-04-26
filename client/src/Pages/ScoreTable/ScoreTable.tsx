import React from "react";
import { Image } from "../../elements/Image";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Group } from "../../interfaces";
import { User } from "../../interfaces";
import { ScoreRow } from "../../elements/ScoreRow";
import { ScoreItem } from "../../elements/ScoreItem";
import { LoadingText } from "../../elements/LoadingText";
import { Container } from "@material-ui/core";
import { FETCH_GROUP } from "../../queries";
import "./ScoreTable.css";
// eslint-disable-next-line
const log = console.log;
interface Data {
  group: Group;
}

export const ScoreTable = () => {
  const history = useHistory();
  const { data, loading: loadingTable } = useQuery<Data, Record<string, any>>(
    FETCH_GROUP,
    {
      variables: {
        groupId: history.location.state,
        userId: localStorage.getItem("user_id"),
      },
    }
  );
  log(data);

  const handleClick = (
    name: string,
    userId: string | undefined,
    leagueId: string
  ) => {
    history.push("/opponents", { name, userId, leagueId });
  };
  const handleClass = (index: number) => {
    let className = "0";
    if (index === 0) className = "10px 10px 0 0";
    if (data?.group?.users && index === data.group.users.length - 1)
      className = "0 0 10px 10px";
    if (
      index === 0 &&
      data?.group?.users &&
      index === data.group.users.length - 1
    )
      className = "10px";
    return className;
  };
  return (
    <>
      <h2>{data?.group?.name}</h2>
      {data?.group?.image && (
        <Image
          src={`${process.env.REACT_APP_CLOUDINARY_IMAGE}${data?.group?.image}`}
          alt={data?.group?.name}
          noboard="unset"
          margin="1em auto 2em auto"
          verticalalign="middle"
          height="100px"
          width="100px"
        />
      )}
      {loadingTable ? (
        <LoadingText>loading Table...</LoadingText>
      ) : (
        data?.group?.users?.sort((a: User, b: User) => b.score - a.score) && (
          <Container className="container">
            {data.group.users.map((gambler: User, index: number) => (
              <ScoreRow
                className="item"
                borderradius={handleClass(index)}
                key={gambler._id}
                onClick={() =>
                  handleClick(gambler.name, gambler._id, data.group.league._id)
                }
              >
                {log(data.group.league._id)}
                <div>{index + 1}.</div>
                <Image
                  noboard="1px solid black"
                  margin="0"
                  verticalalign="unset"
                  height="30px"
                  width="30px"
                  src={gambler.image}
                />
                <ScoreItem>{gambler.name}</ScoreItem>
                <ScoreItem>success rate 50%</ScoreItem>
                <ScoreItem>Bullseye 7</ScoreItem>
                <ScoreItem>{gambler.score || 11}</ScoreItem>
              </ScoreRow>
            ))}
          </Container>
        )
      )}
    </>
  );
};
