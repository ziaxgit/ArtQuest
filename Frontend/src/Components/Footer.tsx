export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6">
            <p>
              &copy; {new Date().getFullYear()} ArtQuest. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            Built by
            <a
              href="https://github.com/ziaxgit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <i className="bi bi-github me-1"></i>
              Ziaur Rahman
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
