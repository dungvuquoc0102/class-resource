export const ResultJob = ({ job }) => {
  return (
    <div className="flex hover:cursor-pointer">
      <img
        className="size-16 object-cover"
        src={job.image_url}
        alt={job.title}
      />
      <div className="flex-1 flex flex-col gap-1 ml-3">
        <h3 className="text-sm font-semibold">{job.title}</h3>
        <p className="text-xs text-gray-500">{job.companyName}</p>
        <p className="text-xs text-primary font-semibold">{job.salary}</p>
      </div>
    </div>
  );
};
