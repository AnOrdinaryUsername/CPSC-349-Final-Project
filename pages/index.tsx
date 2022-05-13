import { Accordion, Button, Center, Container, Text, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ProjectAccordion } from 'components/ProjectAccordion';
import dayjs from 'dayjs';
import type { Project } from 'types';

const Home = () => {
  const now = dayjs().toString();
  const [today, setToday] = useLocalStorage({ key: now, defaultValue: null });
  let projects = null;

  if (today) {
    const todayTodos: Array<Project> = JSON.parse(today);
    projects = todayTodos.map((todo, i) => <ProjectAccordion {...todo} key={i} />);
  }

  return (
    <Center>
      <Container size="sm" px="md">
        <Center>
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
          <Button variant="outline">Add another task</Button>
        </Center>
      </Container>
    </Center>
  );
};

export default Home;
