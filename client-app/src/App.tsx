import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Activity } from './interfaces/Activity';
import { ActivityService } from './services/ActivtityService';
import './App.css';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await ActivityService.getActivities();
    setActivities(data);
  }

  return (
    <div>
      <Header as={'h2'} icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: Activity) => (
          <li key={activity.id}>
            {activity.title}
          </li>
        ))}
      </List>
    </div>
  );
}

export default App;
