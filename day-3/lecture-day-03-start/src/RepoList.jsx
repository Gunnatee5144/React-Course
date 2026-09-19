export function RepoList({ repos }) {
  return (
    <div className="grid grid-cols-2 gap-4">
        {repos.map((repo) => (
          <div key={repo.id} className="border p-4 rounded">
            <p>
                {repo.fullName} * {repo.stars}
            </p>
          </div>
        ))}
    </div>
  );
}