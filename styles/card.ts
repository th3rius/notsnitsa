import css from "styled-jsx/css";

import theme from "./theme";

export default css.global/* language=css */ `
  .kg-card {
    margin: 0.8em 0 2.3em;
  }

  .kg-gallery-container {
    display: flex;
    flex-direction: column;
  }

  .kg-gallery-row {
    display: flex;
    gap: 1.2rem;
  }

  .kg-gallery-image img {
    height: 100%;
  }

  .kg-bookmark-card {
    border-radius: 2px;
    transition: box-shadow 0.3s, border-color 0.3s;
    overflow: hidden;
  }

  .kg-bookmark-card:hover {
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
  }

  .kg-bookmark-card:hover .kg-bookmark-content {
    border-color: transparent;
  }

  .kg-bookmark-container {
    display: flex;
  }

  .kg-bookmark-content {
    border-left: 1px solid #f0f0f0;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 16px;
    font-size: 0.8em;
  }

  .kg-bookmark-icon {
    margin-right: 8px;
    width: 22px;
    height: 22px;
  }

  .kg-bookmark-title {
    color: #111;
    font-weight: 600;
  }

  .kg-bookmark-description {
    display: -webkit-box;
    overflow-y: hidden;
    margin-top: 12px;
    max-height: 50px;
    color: ${theme.colorMute};
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .kg-bookmark-metadata {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 14px;
    color: #111;
    font-weight: 500;
  }

  .kg-bookmark-thumbnail {
    position: relative;
    min-width: 33%;
    max-height: 100%;
  }

  .kg-bookmark-thumbnail img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }

  .kg-card-hascaption figcaption {
    color: #999;
    font-size: 12px;
    text-align: center;
  }

  @media (max-width: 500px) {
    .kg-gallery-container {
      margin: auto -1.6rem;
    }

    .kg-bookmark-container {
      flex-direction: column;
    }

    .kg-bookmark-content {
      order: 2;
      border-top: unset;
      border-left: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }

    .kg-bookmark-thumbnail {
      order: 1;
      min-height: 160px;
      width: 100%;
    }
  }
`;
