import { act, render, screen, waitFor, within } from "@testing-library/react";
import { App } from "../App";
import { LOAD_MORE_BUTTON_TEXT } from "src/const";
import apiData from "src/api";
import apiDataMock from "src/mockData.json";

jest.mock("src/api");
const mockedApiData = apiData as jest.MockedFunction<typeof apiData>;

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render application", () => {
    // when
    render(<App />);

    // then
    const selectedCount = screen.getByTestId("selected-count");
    expect(selectedCount).toBeVisible();
    expect(selectedCount.textContent).toEqual("0");
  });

  it("should load and display persons", async () => {
    // given
    mockedApiData.mockResolvedValueOnce(apiDataMock.slice(0, 10));

    // when
    render(<App />);
    const loadMoreButton = screen.getByTestId("load-more-button");

    // then
    expect(loadMoreButton).toBeVisible();

    // when
    act(() => {
      loadMoreButton.click();
    });

    // then
    const firstPerson = await screen.findByTestId("person-info-1");
    expect(firstPerson).toBeVisible();
  });

  it("should display an error state when API call fails", async () => {
    // given
    mockedApiData.mockRejectedValueOnce(new Error("API Error"));

    // when
    render(<App />);

    // then
    const loadMoreButton = screen.getByTestId("load-more-button");
    expect(loadMoreButton.textContent).toEqual(LOAD_MORE_BUTTON_TEXT.idle);

    // when
    act(() => {
      loadMoreButton.click();
    });

    // then
    await waitFor(() => {
      expect(loadMoreButton.textContent).toEqual(LOAD_MORE_BUTTON_TEXT.error);
    });
  });

  it("should append next users on next load", async () => {
    // given
    mockedApiData
      .mockResolvedValueOnce(apiDataMock.slice(0, 10))
      .mockResolvedValueOnce(apiDataMock.slice(10, 20));

    // when
    render(<App />);

    // then
    const loadMoreButton = screen.getByTestId("load-more-button");
    expect(loadMoreButton).toBeEnabled();

    // when
    act(() => {
      loadMoreButton.click();
    });

    // then
    const firstPerson = await screen.findByTestId("person-info-1");
    expect(firstPerson).toBeVisible();

    // when
    act(() => {
      loadMoreButton.click();
    });

    // then
    const secondPerson = await screen.findByTestId("person-info-20");
    expect(secondPerson).toBeVisible();
    expect(firstPerson).toBeVisible();
  });

  it("should reorder list on selecting/deselecting person", async () => {
    // given
    mockedApiData.mockResolvedValueOnce(apiDataMock.slice(0, 10));
    const expectNamesOrder = async (...names: string[]) => {
      const allPersons = await screen.findAllByTestId(/person-info-/);
      names.forEach((expectedName: string, index: number) => {
        const name = within(allPersons[index]).getByRole("heading").textContent;

        expect(name).toEqual(expectedName);
      });
    };

    // when
    render(<App />);

    // then
    const loadMoreButton = screen.getByTestId("load-more-button");
    expect(loadMoreButton).toBeEnabled();

    // when
    act(() => {
      loadMoreButton.click();
    });

    // then
    await expectNamesOrder("Ron Giles", "Melinda Mcgregor", "Wade Steer");

    // when
    const thirdPerson = await screen.findByTestId("person-info-3");
    act(() => {
      thirdPerson.click();
    });

    // then
    await expectNamesOrder("Wade Steer", "Ron Giles", "Melinda Mcgregor");

    // when
    act(() => {
      thirdPerson.click();
    });

    // then
    await expectNamesOrder("Ron Giles", "Melinda Mcgregor", "Wade Steer");
  });
});
