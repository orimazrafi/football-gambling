import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "../../elements/Image";
import "./GamblingTable.css";
const log = console.log;
export const GamblingTable = () => {
  const [matches, setMatches] = useState<any>([]);
  const [matchesResults, setMatchesResults] = useState<any>([]);
  useEffect(() => {
    const onLoad: any = async () => {
      const { data } = await axios.get("http://localhost:3000/matches.json");
      // console.log(data.matches.competition.area.ensignUrl);
      setMatches(() => data.matches);
      setM(data.matches.length);
    };
    onLoad();
  }, []);
  const setM = (numberOfMatches: number) => {
    let arrayOfResults = [];
    for (let i = 0; i < numberOfMatches; i++)
      arrayOfResults.push({ homeTeam: undefined, awayTeam: undefined });
    setMatchesResults(arrayOfResults);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    let matchesResult = matchesResults;
    matchesResult[index][name] = parseInt(value);
    log(matchesResult);
    setMatchesResults(matchesResult);
  };

  return (
    <div>
      GamblingTable
      <div>
        <hr />
        <br />

        <div style={{ textAlign: "center" }}>
          {matches.length > 0 && (
            <>
              {matches[0].competition.name} league,
              {" " + matches[0].competition.area.name}
              {
                <Image
                  src={matches[0].competition.area.ensignUrl}
                  alt={matches[0].competition.area.name}
                />
              }
              <div>
                <span className="start__date">Start Date:</span>
                {matches[0].season.startDate} --{" "}
                <span className="end__date">End Date:</span>
                {matches[0].season.endDate}
              </div>
            </>
          )}
        </div>
        <br />

        {matchesResults.length > 0 && (
          <div
            style={
              {
                // display: "flex",
                // flexWrap: "wrap",
                // justifyContent: "center",
              }
            }
          >
            {matches.map((match: any, index: number) => (
              <div
                key={match.id}
                style={{
                  display: "flex",

                  justifyContent: "center",
                }}
              >
                <div className="team__column">{match.homeTeam.name + " "}</div>
                <div className="flag__column">
                  <Image src={match.competition.area.ensignUrl} />
                </div>
                <div className="reasults__colummn">
                  <input
                    type="number"
                    min={0}
                    max={10}
                    className="result__input"
                    name="homeTeam"
                    value={matchesResults[index].homeTeam}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, index)
                    }
                  />
                  --
                  <input
                    type="number"
                    name="awayTeam"
                    min={0}
                    max={10}
                    className="result__input"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, index)
                    }
                    value={matchesResults[index].awayTeam}
                  />
                </div>
                <div className="team__column team__away">
                  {" " + match.awayTeam.name}{" "}
                </div>
                <div className="flag__column">
                  <Image src={match.competition.area.ensignUrl} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* {matches.length > 0 && (
        <pre>
          {JSON.stringify(matches[0].competition.area.ensignUrl, null, 2)}
        </pre>
      )} */}
    </div>
  );
};
