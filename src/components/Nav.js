import './Layout.css';

function Nav() {
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid" >
        <img className="imgAvatar" src="https://www.proplan.co.th/sites/20200910/Cat_life_stage_difference.jpg" alt="Avatar" width="200" height="200" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a class="navbar-brand" >Suphapong.b</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <a class="nav-link" href="/about">About</a>
            <a class="nav-link" href="/contact">Contacts</a>
            <a class="nav-link" href="/list-work">Works</a>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Project
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/create-work">ปี 1 create-work</a></li>
                <li><a class="dropdown-item" href="/edit-work">ปี 2 edit-work</a></li>
                <li><a class="dropdown-item" href="/list-work">ปี 3 list-work</a></li>
                <li><a class="dropdown-item" href="#">ปี 4 </a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Other</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
}

export default Nav;
