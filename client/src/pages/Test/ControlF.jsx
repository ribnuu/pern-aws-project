import React, { useContext } from "react";
import {
  MatchText,
  SearchProvider,
  SearchContext,
  SearchEventContext,
} from "react-ctrl-f";

export default function Control() {
  const { searchValue, activeCount, totalCount } = useContext(SearchContext);
  const { onSearchChange, onPrev, onNext } = useContext(SearchEventContext);
  return (
    <div className="mx-12 my-12">
      <SearchProvider>
        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            border: "1px solid green",
          }}
        >
          <input
            style={{ width: 200, marginRight: "12px", height: "24px" }}
            value={searchValue}
            onChange={onSearchChange}
          />
          <button
            style={{ height: "28px" }}
            title="Up"
            onClick={() => onPrev(100)}
          >
            Prev
          </button>
          <span style={{ padding: "0px 12px" }}>
            {activeCount}/{totalCount}
          </span>
          <button
            style={{ height: "28px" }}
            title="Down"
            onClick={() => onNext(100)}
          >
            Next
          </button>
        </div>
        <p className="my-12">
          <MatchText id="match-1">
            React components implement a render() method that takes input data
            and returns what to display. This example uses an XML-like syntax
            called JSX. Input data that is passed into the component can be
            accessed by render() via this.props. JSX is optional and not
            required to use React. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Cupiditate minima omnis explicabo nam debitis
            ipsam, ducimus maiores, pariatur vero laboriosam est consequatur.
            Natus quae incidunt delectus magnam a reprehenderit nihil? Impedit
            omnis quaerat enim voluptatem sint, cumque quas! Expedita labore
            omnis beatae, ex tempore dolore aliquid obcaecati repellendus ipsa,
            voluptas corrupti, neque vitae exercitationem at doloremque rem
            impedit similique veritatis sapiente. Ipsa culpa beatae corrupti,
            aut aliquam et itaque. Fugit omnis deserunt totam laborum a
            veritatis dolore quod tenetur doloremque, veniam qui id
            reprehenderit rerum magnam atque nobis magni est, aliquam,
            laudantium velit vero ipsa. Officiis laborum nihil distinctio
            necessitatibus?
          </MatchText>
        </p>
      </SearchProvider>
    </div>
  );
}
