import React, { useCallback, useState } from 'react';
import { Menu, MenuProps } from 'antd';

type Props = {
	mode: 'horizontal' | 'vertical' | 'inline';
	items: {
		label: JSX.Element;
		key: string;
	}[];
};

function CreateMenu({ mode, items }: Props) {
	const [current, setCurrent] = useState<string>('');

	const onMenu: MenuProps['onClick'] = (e) => {
		setCurrent(e.key);
	};

	return <Menu mode={mode} onClick={onMenu} items={items} selectedKeys={[current]} />;
}

export default React.memo(CreateMenu);
