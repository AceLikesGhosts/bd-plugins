import { React } from '@lib/components';
import Flex from '@lib/components/Flex';
import { AutoBanModal } from './AutoBanModal';
import { NameFilterModal } from './NameFilteringModal';
import { SharedCallOwnershipModal } from './SharedCallOwnershipModal';
const { Button } = BdApi.Components;

export function ModalRoot() {
    const [selectedTab, setSelectedTab] = React.useState<'autobans' | 'name' | 'ownership'>('autobans');

    const PageMapping = {
        'autobans': AutoBanModal,
        'name': NameFilterModal,
        'ownership': SharedCallOwnershipModal,
    };

    const InnerPage = PageMapping[selectedTab];

    const handleButtonClick = (tab: 'autobans' | 'name' | 'ownership') => {
        setSelectedTab(tab);
    };

    return (
        <div>
            <Flex
                direction={Flex.Direction.VERTICAL}
                justify={Flex.Justify.BETWEEN}
            >
                <ul style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <li>
                        <Button
                            color={selectedTab === 'autobans' ? Button.Colors.BRAND : Button.Colors.TRANSPARENT}
                            onClick={() => handleButtonClick('autobans')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontWeight: selectedTab === 'autobans' ? 'bold' : 'normal',
                                backgroundColor: selectedTab === 'autobans' ? '#7289da' : 'transparent',
                                color: selectedTab === 'autobans' ? 'white' : '#b9bbbe',
                            }}
                        >
                            Auto Bans
                        </Button>
                    </li>
                    <li>
                        <Button
                            color={selectedTab === 'name' ? Button.Colors.BRAND : Button.Colors.TRANSPARENT}
                            onClick={() => handleButtonClick('name')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontWeight: selectedTab === 'name' ? 'bold' : 'normal',
                                backgroundColor: selectedTab === 'name' ? '#7289da' : 'transparent',
                                color: selectedTab === 'name' ? 'white' : '#b9bbbe',
                            }}
                        >
                            Name Filtering
                        </Button>
                    </li>
                    <li>
                        <Button
                            color={selectedTab === 'ownership' ? Button.Colors.BRAND : Button.Colors.TRANSPARENT}
                            onClick={() => handleButtonClick('ownership')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontWeight: selectedTab === 'ownership' ? 'bold' : 'normal',
                                backgroundColor: selectedTab === 'ownership' ? '#7289da' : 'transparent',
                                color: selectedTab === 'ownership' ? 'white' : '#b9bbbe',
                            }}
                        >
                            Shared Call Ownership
                        </Button>
                    </li>
                </ul>
            </Flex>

            <InnerPage />
        </div>
    );
}
