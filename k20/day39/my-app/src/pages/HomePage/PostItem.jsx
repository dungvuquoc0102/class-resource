export default function PostItem({ post }) {
  return (
    <div className="flex ">
      <img
        className="w-10 h-10 rounded-full"
        src={post.user.avatar_url || "/img/default-avatar.jpg"}
        alt="Avatar user"
      />
      <div>
        <div>
          <span>{post.user.name}</span>
        </div>
        <p>{post.content}</p>
        <div className="flex">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              aria-label="Like"
              className="stroke-[2px] transition-colors h-5 w-5 text-threads-icon-action group-hover:text-threads-icon-action"
              viewBox="-0.5 0 25 24"
              fill="currentColor"
              style={{
                "--x-fill": "transparent",
                "--x-height": "19",
                "--x-width": "18.75px",
              }}
            >
              <path
                fill="currentColor"
                d="M16.5 2c-1.666 0-3.278.707-4.5 1.937C10.778 2.707 9.166 2 7.5 2c-4.121 0-7 3.084-7 7.5 0 4.628 4.345 9.962 10.811 13.272a1.5 1.5 0 0 0 1.378 0C19.155 19.462 23.5 14.128 23.5 9.5c0-4.416-2.878-7.5-7-7.5M12 20.876c-5.692-2.98-9.5-7.53-9.5-11.376 0-3.341 1.963-5.5 5-5.5 2 0 3.75 1.75 4.5 3.5.75-1.75 2.5-3.5 4.5-3.5 3.038 0 5 2.159 5 5.5 0 3.847-3.808 8.396-9.5 11.376"
              ></path>
            </svg>
            {post.likes_count}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              aria-label="Reply"
              className="stroke-[2px] transition-colors h-4.5 w-4.5 text-threads-icon-action group-hover:text-threads-icon-action"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                "--x-fill": "currentColor",
                "--x-height": "18",
                "--x-width": "18",
              }}
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 3a9 9 0 0 0 0 18c1.414 0 2.75-.325 3.937-.904a1 1 0 0 1 .614-.086l4.206.752-.764-4.17a1 1 0 0 1 .086-.621C20.67 14.774 21 13.427 21 12a9 9 0 0 0-9-9M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11c0 1.62-.351 3.162-.982 4.549l.966 5.27a1 1 0 0 1-1.16 1.165l-5.312-.95C15.134 22.656 13.606 23 12 23 5.925 23 1 18.075 1 12"
                clipRule="evenodd"
              ></path>
            </svg>
            {post.replies_count}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              aria-label="Repost"
              className="stroke-[2px] transition-colors h-4.5 w-4.5 text-threads-icon-action group-hover:text-threads-icon-action"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                "--x-fill": "currentColor",
                "--x-height": "18",
                "--x-width": "18",
              }}
            >
              <path
                fill="currentColor"
                d="M4.516 6.999a8.99 8.99 0 0 1 7.483-4 9 9 0 0 1 8.294 5.498 1 1 0 0 0 1.842-.78A11 11 0 0 0 11.999 1C8.279 1 4.99 2.848 3 5.674V3a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2zM2.396 14.971a1 1 0 0 1 1.31.532A9 9 0 0 0 12 21 8.99 8.99 0 0 0 19.483 17h-2.484a1 1 0 1 1 0-2h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-2.675A10.99 10.99 0 0 1 12 23a11 11 0 0 1-10.135-6.718 1 1 0 0 1 .532-1.31"
              ></path>
            </svg>
            {post.reposts_and_quotes_count}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              aria-label="Share"
              className="stroke-[2px] transition-colors h-4.5 w-4.5 text-threads-icon-action group-hover:text-threads-icon-action"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                "--x-fill": "currentColor",
                "--x-height": "18",
                "--x-width": "18",
              }}
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.247 1.499C4.183-.187.6 2.643 1.53 6.014L3.182 12 1.53 17.986c-.93 3.37 2.653 6.201 5.717 4.515l13.578-7.468c2.39-1.315 2.39-4.75 0-6.066zM3.458 5.482c-.46-1.666 1.311-3.064 2.825-2.231L19.86 10.72q.213.117.365.28H4.98zM4.981 13l-1.523 5.518c-.46 1.665 1.311 3.064 2.825 2.231l13.577-7.468q.213-.118.365-.281z"
                clipRule="evenodd"
              ></path>
            </svg>
            {post.reposts_and_quotes_count}
          </span>
        </div>
      </div>
    </div>
  );
}
