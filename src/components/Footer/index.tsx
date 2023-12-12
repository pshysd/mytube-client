import { SmileFilled } from '@ant-design/icons';
import React from 'react';
import { Wrapper } from './styles';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<Wrapper>
			<Link to="https://github.com/pshysd">¿hire Me?</Link>
			<SmileFilled />
		</Wrapper>
	);
}

export default React.memo(Footer);
