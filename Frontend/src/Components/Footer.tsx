export default function Footer() {
  return (
    <footer className="text-black" style={{ backgroundColor: "#ededed" }}>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6">
            <p>
              &copy; {new Date().getFullYear()} ArtQuest. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end ">
            Developed by
            <a
              href="https://github.com/ziaxgit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="me-1"></i>
              Ziaur Rahman
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
