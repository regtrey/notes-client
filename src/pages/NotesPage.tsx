import { Container } from 'react-bootstrap';
import styles from '../styles/NotesPage.module.css';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import { User } from '../models/users';

type NotesPageProps = {
  loggedInUser: User | null;
};

function NotesPage({ loggedInUser }: NotesPageProps) {
  return (
    <Container className={styles.notePage}>
      {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
    </Container>
  );
}

export default NotesPage;
