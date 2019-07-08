import React, { Component } from "react";

//userInfo

export default class Profile extends Component {
  render() {
    let userInfo = this.props.userData;
    let followers = `${userInfo.homeURL}/followers`;
    let following = `${userInfo.homeURL}/following`;
    let repos = `${userInfo.homeURL}/repositories`;

    if (userInfo.notFound === "Not Found") {
      return (
        <div className='notfound'>
          <h2>Hi</h2>
          <p>Sorry about that but user was not found.</p>
        </div>
      );
    } else {
      return (
        <section className='github-profile'>
          <div className='github-profile-info'>
            <a
              href={userInfo.homeURL}
              target='_blank'
              title={userInfo.name || userInfo.username}
            >
              <img src={userInfo.avatar} />
            </a>
            <h2>
              <a href={userInfo.homeURL} target='_blank'>
                {userInfo.name || userInfo.username}
              </a>
            </h2>
            <h3>{userInfo.location}</h3>
          </div>
          <div className='github-profile-state'>
            <ul>
              <li>
                <a href={followers} target='_blank' title='Number Of Followers'>
                  <i>{userInfo.followers}</i>
                  <span>Followers</span>
                </a>
              </li>
              <li>
                <a href={repos} target='_blank' title='Number Of Repositoriy'>
                  <i>{userInfo.repos}</i>
                  <span>Repositoriy</span>
                </a>
              </li>
              <li>
                <a href={following} target='_blank' title='Number Of Following'>
                  <i>{userInfo.following}</i>
                  <span>Following</span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      );
    }
  }
}
