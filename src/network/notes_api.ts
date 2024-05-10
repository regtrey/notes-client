import { ConflictError, UnauthorizedError } from '../errors/http_errors';
import { Note } from '../models/notes';
import { User } from '../models/users';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);

  if (res.ok) {
    return res;
  } else {
    const errorBody = await res.json();
    const errorMessage = errorBody.error;
    if (res.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (res.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        `Request failed with status: ${res.status} message: ${errorMessage}`
      );
    }
  }
}

export async function getLoggedInUser(): Promise<User> {
  const res = await fetchData('/api/users', {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': 'https://notes-mern-client.vercel.app',
    },
  });
  return res.json();
}

export type SignupCredentials = {
  username: string;
  email: string;
  password: string;
};

export async function signup(credentials: SignupCredentials): Promise<User> {
  const res = await fetchData(
    'https://notes-mern-api.vercel.app/api/users/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(credentials),
    }
  );
  return res.json();
}

export type LoginCredentials = {
  username: string;
  password: string;
};

export async function login(credentials: LoginCredentials): Promise<User> {
  const res = await fetchData('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://notes-mern-client.vercel.app',
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function logout() {
  await fetchData('https://notes-mern-api.vercel.app/api/users/logout', {
    method: 'POST',
  });
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData('/api/notes', {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': 'https://notes-mern-client.vercel.app',
    },
  });
  return res.json();
}

export type NoteInput = {
  title: string;
  text?: string;
};

export async function createNote(note: NoteInput): Promise<Note> {
  const res = await fetchData('https://notes-mern-api.vercel.app/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(note),
  });

  return res.json();
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const res = await fetchData(
    `https://notes-mern-api.vercel.app/api/notes/${noteId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(note),
    }
  );

  return res.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`https://notes-mern-api.vercel.app/api/notes/${noteId}`, {
    method: 'DELETE',
  });
}
