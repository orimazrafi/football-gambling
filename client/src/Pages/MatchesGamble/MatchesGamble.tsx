import React from "react";
import { Image } from "../../elements/Image";
import { Game, UserWithFullResults } from "../../interfaces";
import { useSelector } from "react-redux";
import { GambleWrapper } from "../../elements/GambleWrapper";
import { GambleUnit } from "../../elements/GambleUnit";
import { GambleButton } from "../../elements/GambleButton";
import { SuccessButton } from "../../elements/SuccessButton";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { useSetMatchesGamble } from "../../Hooks/useSetMatchesGamble";
import { useRandomGamble } from "../../Hooks/useRandomGamble";
import { useSaveGamble } from "../../Hooks/useSaveGamble";
import { useRandomGambleConfirmationBox } from "../../Hooks/useRandomGambleConfirmationBox";
import { useSetIntialResultFromServer } from "../../Hooks/useSetIntialResultFromServer";
import { useFetchUserResults } from "../../Hooks/useFetchUserResults";
import { MatchDateColumn } from "../../Components/MatchDateColumn/MatchDateColumn";
import { MatchGambleInputsWrapper } from "../../Components/MatchGambleInputsWrapper/MatchGambleInputsWrapper";
import "./MatchesGamble.css";
// eslint-disable-next-line
const log = console.log;

export const MatchesGamble = () => {
  const { user } = useSelector(
    (state: {
      user: {
        user: UserWithFullResults;
      };
    }) => state.user
  );

  const { data, loadingUserResults } = useFetchUserResults(user._id);
  useSetIntialResultFromServer(user, data);
  const { handleChange, autoFocus } = useSetMatchesGamble();
  const { addRandom } = useRandomGamble(user);
  const { handleRandomGamble } = useRandomGambleConfirmationBox(addRandom);
  const { handleSave } = useSaveGamble(user);
  return (
    <>
      {loadingUserResults ? (
        <LoadingGif loading={loadingUserResults} size={150} />
      ) : (
        <>
          <div className="gambling-table">
            {user?.results?.games?.map((match: Game, index: number) => (
              <GambleWrapper key={Math.random()}>
                <MatchDateColumn index={index} match={match} />
                <GambleUnit width="15%">{match.homeTeam.name}</GambleUnit>
                <Image
                  noboard="unset"
                  margin="10px 0 10px 0"
                  verticalalign="middle"
                  height="30px"
                  width="30px"
                  src={match.homeTeam.image}
                />
                <MatchGambleInputsWrapper
                  user={user}
                  index={index}
                  handleChange={handleChange}
                  autoFocus={autoFocus}
                />
                <Image
                  noboard="unset"
                  margin="10px 0 10px 0"
                  verticalalign="middle"
                  height="30px"
                  width="30px"
                  src={match.awayTeam.image}
                />

                <GambleUnit width="30%">
                  {" " + match.awayTeam.name}{" "}
                </GambleUnit>
                <GambleButton
                  variant="contained"
                  color="primary"
                  background="blue"
                  backgroundhover="rgba(0, 0, 0, 0.12)"
                  disabled={index < 3}
                  onClick={() => {
                    handleRandomGamble(index);
                  }}
                >
                  Luck Gamble
                </GambleButton>
              </GambleWrapper>
            ))}
          </div>
          <SuccessButton
            margin="1em auto"
            padding="0.5em"
            onClick={handleSave}
            background="rgb(28, 184, 65)"
          >
            Save
          </SuccessButton>
        </>
      )}
    </>
  );
};
