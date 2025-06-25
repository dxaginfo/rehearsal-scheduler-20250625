import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Grid, 
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import { formatDistanceToNow, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { fetchUpcomingRehearsals } from '../../store/slices/rehearsalSlice';

const UpcomingRehearsals = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { upcomingRehearsals, isLoading, error } = useSelector(
    (state) => state.rehearsals
  );
  
  useEffect(() => {
    dispatch(fetchUpcomingRehearsals());
  }, [dispatch]);
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Error loading rehearsals: {error}
      </Alert>
    );
  }
  
  if (!upcomingRehearsals || upcomingRehearsals.length === 0) {
    return (
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" color="text.secondary">
              No upcoming rehearsals
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate('/rehearsals/new')}
            >
              Schedule Rehearsal
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2" fontWeight={600}>
          Upcoming Rehearsals
        </Typography>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => navigate('/rehearsals')}
        >
          View All
        </Button>
      </Box>
      
      <Grid container spacing={2}>
        {upcomingRehearsals.slice(0, 3).map((rehearsal) => {
          const startDate = new Date(rehearsal.startTime);
          const endDate = new Date(rehearsal.endTime);
          
          return (
            <Grid item xs={12} md={4} key={rehearsal.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                    cursor: 'pointer'
                  }
                }}
                onClick={() => navigate(`/rehearsals/${rehearsal.id}`)}
              >
                <Box 
                  sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    color: 'white',
                    py: 1.5,
                    px: 2
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {rehearsal.band.name}
                  </Typography>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {rehearsal.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, color: 'text.secondary' }}>
                    <EventIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {format(startDate, 'E, MMM d, yyyy')}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: 'text.secondary' }}>
                    <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: 'text.secondary' }}>
                    <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2" noWrap>
                      {rehearsal.location}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PeopleIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {rehearsal.attendanceCount}/{rehearsal.band.memberCount} attending
                      </Typography>
                    </Box>
                    
                    <Chip 
                      label={
                        rehearsal.userResponse === 'ATTENDING' ? 'Going' :
                        rehearsal.userResponse === 'DECLINED' ? 'Declined' :
                        rehearsal.userResponse === 'TENTATIVE' ? 'Maybe' : 'Respond'
                      }
                      color={
                        rehearsal.userResponse === 'ATTENDING' ? 'success' :
                        rehearsal.userResponse === 'DECLINED' ? 'error' :
                        rehearsal.userResponse === 'TENTATIVE' ? 'warning' : 'primary'
                      }
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      {upcomingRehearsals.length > 3 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="text" 
            color="primary"
            onClick={() => navigate('/rehearsals')}
          >
            View {upcomingRehearsals.length - 3} more rehearsals
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UpcomingRehearsals;