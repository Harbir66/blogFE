import axios from 'axios';
import makeRequest from '..';
import {
  BACKEND_URL,
  GET_BLOG_DATA,
  UPDATE_BLOG_DATA,
} from '../../../constants/apiEndPoints';
import { ERROR_ROUTE } from '../../../constants/routes';

const mockBlogData = [
  {
    id: 1,
    date: '2020-10-10T00:00:00.000Z',
    reading_time: '5 mins',
    title: 'Mock Title 1',
    description: 'This is a description',
    claps: 10,
    liked: false,
    image: 'https://i.ibb.co/LNxt44v/abstract.png',
  },
  {
    id: 2,
    date: '2020-10-10T00:00:00.000Z',
    reading_time: '5 mins',
    title: 'Mock Title 2',
    description: 'This is a description',
    claps: 10,
    liked: false,
    image: 'https://i.ibb.co/LNxt44v/abstract.png',
  },
];
jest.mock('axios');

describe('makeRequest', () => {
  it('should make api call with appropriate request options and return response body when only api end point is specified', async () => {
    axios.mockResolvedValue({ data: mockBlogData });
    expect(axios).not.toBeCalled();
    const response = await makeRequest(GET_BLOG_DATA);
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      method: 'GET',
      url: `${BACKEND_URL}/blog-posts`,
    });
    expect(response).toEqual(mockBlogData);
  });
  it('should make api call with appropriate request options and return response body when only api end point and request body is specified', async () => {
    axios.mockResolvedValue({ data: { data: { claps: 11 } } });
    expect(axios).not.toBeCalled();
    const response = await makeRequest(UPDATE_BLOG_DATA(1), {
      data: { claps: 11 },
    });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      method: 'PUT',
      url: `${BACKEND_URL}/blog-posts/1`,
      data: { claps: 11 },
    });
    expect(response).toEqual({ data: { claps: 11 } });
  });
  it('should navigate to error page with status code when API call returns error status code', async () => {
    const mockNavigate = jest.fn();
    axios.mockRejectedValueOnce({ response: { status: 500 } });
    expect(mockNavigate).not.toBeCalled();
    await makeRequest(
      UPDATE_BLOG_DATA(1),
      {
        data: { claps: 1 },
      },
      mockNavigate
    );
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`${ERROR_ROUTE}/500`);
  });
  it('should navigate to error page with status code when API call returns error status code', async () => {
    const mockNavigate = jest.fn();
    axios.mockRejectedValueOnce({});
    expect(mockNavigate).not.toBeCalled();
    await makeRequest(
      UPDATE_BLOG_DATA(1),
      {
        data: { claps: 1 },
      },
      mockNavigate
    );
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ERROR_ROUTE);
  });
});
