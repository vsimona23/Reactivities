import React, { SyntheticEvent } from 'react'
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean
    target: string
}

const ActivityDashboard: React.FC<IProps> = ({
    activities, 
    selectActivity, 
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity,
    submitting,
    target
}) => {
    return (
        <Grid>
            <GridColumn width={10}>
            <ActivityList 
                activities={activities} 
                selectActivity={selectActivity} 
                deleteActivity={deleteActivity}
                submitting={submitting}
                target={target}
            />
            </GridColumn>
            <GridColumn width={6}>
                {/* only display selected activities if it's not null (what is after && is only executed if what's on the left is not null) */}
                {selectedActivity && !editMode && (
                <ActivityDetails 
                activity={selectedActivity} 
                setEditMode={setEditMode}
                setSelectedActivity={setSelectedActivity} 
                />
                )} 
                {editMode && (
                <ActivityForm 
                key={selectedActivity && selectedActivity.id || 0}
                setEditMode={setEditMode}
                activity={selectedActivity!}
                editActivity={editActivity}
                createActivity={createActivity}
                submitting={submitting}
                />
                 )} {/* here we mean that Activity form will be only displayed when we are in edit mode */}
            </GridColumn>
        </Grid>
    )
}

export default ActivityDashboard;