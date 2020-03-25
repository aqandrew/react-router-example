import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function UserPage(props) {
  const initialUserState = {
    user: {},
    loading: true,
  };

  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await Axios(`https://api.github.com/users/${props.match.params.id}`);

      setUser(data);
    };

    // Invoke async function
    getUser();
  }, []); // Passing in [] as second argument makes effect function like componentDidMount

  return (
    user.loading ? (
      <div>Loading...</div>
    ) : (
      <div className="container">
        <h1>{props.match.params.id}</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Website</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>
                <a href={user.blog}>{user.blog}</a>
              </td>
              <td>{user.followers}</td>
            </tr>
          </tbody>
        </table>
        <Link to="/">← back to Home Page</Link>
      </div>
    )
  );
}