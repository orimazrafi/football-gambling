import React from "react";
import { Image } from "../../elements/Image";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./ScoreTable.css";
import { Group } from "../../interfaces";
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

  const handleClick = (name: string) => {
    history.push("/opponents", { name });
  };
  const handleClass = (index: number) => {
    let className = "item";
    if (index === 0) className += " first__index";
    if (
      data &&
      data.group &&
      data.group.users &&
      index === data.group.users.length - 1
    )
      className += " last__index";
    return className;
  };
  return (
    <>
      <div className="container">
        <h2>{data?.group?.name}</h2>

        {loadingTable ? (
          <h2>loading Table...</h2>
        ) : (
          data?.group?.users?.sort((a: any, b: any) => b.score - a.score) &&
          data.group.users.map((gambler: any, index: any) => (
            <div key={gambler._id}>
              <div
                className={handleClass(index)}
                key={gambler.name}
                onClick={() => handleClick(gambler.name)}
              >
                <div className="user__table__position__number">
                  {index + 1}.
                </div>
                <Image maringRight src={gambler.picture} />
                <div>{gambler.name}</div> <div> Success rate 50%</div>
                <div>Bullseye 7</div>
                <div> {gambler.score || 11}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
const FETCH_GROUP = gql`
  query group($groupId: ID, $userId: ID) {
    group(groupId: $groupId, userId: $userId) {
      name
      image
      users {
        _id
        name
        image
      }
    }
  }
`;
