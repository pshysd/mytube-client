import styled from 'styled-components';
import { Col as _Col } from 'antd';

export const Col = styled(_Col)`
	& > div {
		width: 100%;
		padding: 3rem 4rem;
	}

	& > div > video {
		width: 100%;
	}

  & li {
    list-style: none;
  }
`;
