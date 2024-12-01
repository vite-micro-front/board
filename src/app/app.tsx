import { Link, useNavigate, useParams } from "react-router-dom";
import { BoardId } from "@vite-micro-front/contracts/kernel";
import { BoardDeletedEvent } from "@vite-micro-front/contracts/events";
import { useDispatch } from "react-redux";

export function App() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div>Bloards</div>
      {params.id && <div>Board {params.id}</div>}
      <Link to="/">Home</Link>
      <button
        onClick={() => {
          dispatch({
            type: "board/deleted",
            version: 1,
            payload: {
              boardId: params.id as BoardId,
            },
          } satisfies BoardDeletedEvent);
          navigate("/");
        }}
      >
        Increment
      </button>
    </>
  );
}
