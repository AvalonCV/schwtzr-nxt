import React from 'react';

import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';

import { MainLayout } from './Components/Layout/MainLayout';

interface AppProps {
	fela_renderer: IRenderer;
}
interface AppState {}

export class App extends React.PureComponent<AppProps, AppState> {
	public render(): JSX.Element {
		return (
			<RendererProvider renderer={this.props.fela_renderer}>
				<MainLayout>
					<div>Hello &amp; Welcome....</div>
				</MainLayout>
			</RendererProvider>
		);
	}
}
