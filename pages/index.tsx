import { Button, Center, Container, createStyles, Stack, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { EditProjectModal, ProjectAccordion } from 'components';
import * as immer from 'immer';
import * as React from 'react';
import type { Project } from 'types';
import { getToday } from 'utils';

const useStyles = createStyles(() => ({
  stretchHeight: {
    flex: 1,
  },

  stretchWidth: {
    width: '100%',
  },

  center: {
    alignSelf: 'center',
  },
}));

const initializeProject = (id: number, date: string): Project => ({
  id: id,
  date: new Date(date),
  name: 'My Example Project',
  priorityLevel: 1,
  tasks: [
    {
      id: 0,
      isCompleted: false,
      description: 'Do dishes!',
      image: '',
      imageAlt: '',
    },
  ],
});

const Home = () => {
  const { classes } = useStyles();

  // Gets the current day in year/month/day format (e.g. "2016/02/18")
  const now = getToday();
  const initialProject = JSON.stringify([initializeProject(0, now)]);

  const [today, setToday] = useLocalStorage<string>({ key: now, defaultValue: initialProject });
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const todayTodos: Array<Project> = JSON.parse(today);
  const projects = todayTodos.map((todo) => (
    <ProjectAccordion
      index={todo.id}
      onUpdate={updateProject}
      onDelete={deleteProject}
      name={todo.name}
      tasks={todo.tasks}
      key={todo.id}
    />
  ));

  const newProject = initializeProject(todayTodos.length, now);
  // Tracks current form
  const [formData, setFormData] = React.useState<Project>(newProject);

  function deleteProject(event: React.MouseEvent<HTMLButtonElement>) {
    const { id } = event.currentTarget;
    const updatedProject = todayTodos.filter((project) => project.id !== parseInt(id));
    setToday(JSON.stringify(updatedProject));
  }

  function updateProject(event: React.MouseEvent<HTMLButtonElement>) {
    const { id } = event.currentTarget;
    const chosenProject = todayTodos[parseInt(id)];
    setFormData(chosenProject);
    showModal();
  }

  function updateFormTracker(project: Project) {
    setFormData(project);
  }

  function addNewProject(project: Project) {
    const updatedProjects = immer.produce(todayTodos, (draftState) => {
      draftState.push(project);
    });
    setToday(JSON.stringify(updatedProjects));
    closeModal();
  }

  function showModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setFormData(newProject);
    setIsOpen(false);
  }

  return (
    <Center className={classes.stretchHeight}>
      <Container size="sm" px="md" className={classes.stretchWidth}>
        <Stack>
          <Title order={1} mb="md" className={classes.center}>
            Here are today&apos;s tasks
          </Title>
          {projects}
          <Button variant="outline" className={classes.center} onClick={showModal}>
            Add another task
          </Button>
        </Stack>
      </Container>
      <EditProjectModal
        projectData={formData}
        updateTracker={updateFormTracker}
        updateProjects={addNewProject}
        opened={isOpen}
        onClose={closeModal}
      />
    </Center>
  );
};

export default Home;
