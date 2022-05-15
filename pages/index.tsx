import { Accordion, Button, Center, Container, Stack, Text, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { EditProjectModal, ProjectAccordion } from 'components';
import * as React from 'react';
import type { Project } from 'types';
import { getToday } from 'utils';

const Home = () => {
  // Gets the current day in year/month/day format (e.g. "2016/02/18")
  const now = getToday();
  const [today, setToday] = useLocalStorage({ key: now, defaultValue: null });
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  let projects = null;

  if (today) {
    const todayTodos: Array<Project> = JSON.parse(today);
    projects = todayTodos.map((todo, i) => <ProjectAccordion {...todo} key={i} />);
  }

  function showModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Center>
      <Container size="sm" px="md">
        <Stack align="center">
          {!projects ? (
            <Text>There are no things to do at the moment!</Text>
          ) : (
            <>
              <Title order={1} mb="md">
                Here are today&apos;s tasks
              </Title>
              <Accordion>{projects}</Accordion>
            </>
          )}
          <Button variant="outline" onClick={showModal}>
            Add another task
          </Button>
        </Stack>
      </Container>
      <EditProjectModal opened={isOpen} onClose={closeModal} />
    </Center>
  );
};

export default Home;
