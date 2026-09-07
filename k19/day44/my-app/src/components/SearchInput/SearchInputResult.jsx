import { ResultJob } from "./ResultJob";
import { ResultKeyword } from "./ResultKeyword";

export const SearchInputResult = ({ searchResult, searchString }) => {
  const { keywords, jobs } = searchResult;
  return (
    <div>
      {searchString && (
        <div className="absolute top-17.5 left-0 right-0 flex bg-white rounded-4xl">
          <div className="w-1/2 p-6 border-r">
            {keywords.map((keyword) => {
              return (
                <ResultKeyword
                  title={keyword.title}
                  keywords={keyword.keywords}
                />
              );
            })}
          </div>
          <div className="w-1/2 p-6 flex flex-col gap-4">
            {jobs.map((job) => {
              return <ResultJob job={job} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
