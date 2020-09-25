import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import {LoadingComponent} from '../layout/LoadingComponent'

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null); //using union type allows us to be more explicit
  const [editMode, setEditMode] = useState(false); // for booleans no need to specify type
  const [loading, setLoading] =useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState(''); //it's empty as it will represent the button name

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]) //filtering out all activities except matching activity and assigning index
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false))
  };

  const handleEditActivity  = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id != activity.id), activity]);
      setSelectedActivity(activity); // set selected activity to updated activity
      setEditMode(false);
    }).then(() => setSubmitting(false))
  };

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name) // set target to the name of the button
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false))
  }

  // to get data
  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        // here it's looping through response to update date format
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities);
      }).then(() => setLoading(false));
  }, []); // here empty array ensure useEffect runs one time only because it will be invoked every time component renders
  // with empty array, componentDidMount is replaced

  if (loading) return <LoadingComponent content='Loading activities...'/>

  return (
    <Fragment>
      <NavBar openCreateForm ={handleOpenCreateForm}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectActivity} 
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}
export default App;
